import { TableModel } from '../database/models';
import { TableProps } from '../interfaces';
import { AppError } from '../models';
import { Op } from 'sequelize';

class TableService {
  constructor() {}

  async findTablesForBar(barId: number) {
    const tables = await TableModel.findAll({
      where: {
        barId,
      },
      order: [['tableNumber', 'ASC']],
    });

    return tables;
  }
  async findTableForBarOr404(tableId: number, barId: number) {
    const table = await TableModel.findOne({
      where: {
        id: tableId,
        barId,
      },
    });
    if (!table) {
      throw new AppError(
        'No se encontró ninguna mesa en el bar con el ID especificado.',
        404
      );
    }
    return table;
  }

  async createTableForBar({
    ability,
    location,
    barId,
  }: Omit<TableProps, 'tableNumber'>) {
    const lastTable = await TableModel.findOne({
      where: {
        barId,
      },
      order: [['tableNumber', 'DESC']],
    });
    const newTableNumber = lastTable ? lastTable.tableNumber + 1 : 1;
    const table = await TableModel.create({
      tableNumber: newTableNumber,
      ability,
      location,
      barId,
    });
    return table;
  }
  async updateTableForBar(
    tableId: number,
    {
      tableNumber: newTableNumber,
      ability,
      isOccupied,
      location,
      barId,
    }: TableProps
  ) {
    const tableToUpdate = await this.findTableForBarOr404(tableId, barId);
    const tableWithNewNumber = await TableModel.findOne({
      where: {
        tableNumber: newTableNumber,
        barId,
      },
    });
    if (tableToUpdate.tableNumber === newTableNumber || !tableWithNewNumber) {
      await tableToUpdate.update({ ability, isOccupied, location });
      return tableToUpdate;
    }
    await Promise.all([
      tableToUpdate.update({ tableNumber: tableWithNewNumber.tableNumber }),
      tableWithNewNumber.update({ tableNumber: newTableNumber }),
    ]);
    await tableToUpdate.update({ ability, isOccupied, location });
    return tableToUpdate;
  }

  async removeTableForBar(tableId: number, barId: number) {
    const table = await this.findTableForBarOr404(tableId, barId);
    await table.destroy();
    const remainingTables = await TableModel.findAll({
      where: {
        barId,
        tableNumber: {
          [Op.gt]: table.tableNumber,
        },
      },
    });
    await Promise.all(
      remainingTables.map(async t => {
        t.tableNumber -= 1;
        await t.save();
      })
    );

    return table;
  }
  async IsOrNotOccupiedTableForBar(tableId: number, barId: number) {
    const table = await this.findTableForBarOr404(tableId, barId);
    table.update({ isOccupied: !table.isOccupied });
    return table;
  }
}

export default TableService;

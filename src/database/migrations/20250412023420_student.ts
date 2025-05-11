import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('students_tbl', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.date('birthdate').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('students_tbl')
}

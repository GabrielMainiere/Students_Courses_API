import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('courses_tbl', function (table) {
        table.increments('id')
        table.string('name', 100).notNullable().unique()
        table.text('description').nullable()
        table.integer('duration').notNullable() 
    })
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('students_courses_tbl')
    await knex.schema.dropTableIfExists('courses_tbl')
}

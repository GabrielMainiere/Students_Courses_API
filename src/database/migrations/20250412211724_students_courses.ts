import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('students_courses_tbl', function (table) {
        table.integer('student_id').unsigned().notNullable()
        table.integer('course_id').unsigned().notNullable()

        table.primary(['student_id', 'course_id'])

        table
            .foreign('student_id')
            .references('id')
            .inTable('students_tbl')
            .onDelete('CASCADE')
        table
            .foreign('course_id')
            .references('id')
            .inTable('courses_tbl')
            .onDelete('CASCADE')
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('students_courses_tbl')
}

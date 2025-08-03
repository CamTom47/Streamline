export interface NewTask {
	title: string;
	userId: number;
	category?: number;
	dateCreated: Date;
	dueDate?: Date;
	priority: number;
	lists?: number[];
	status: number;
	description?: string;
}
export interface UpdateTask {
	title?: string;
	category?: number;
	dueDate?: Date;
	priority?: number;
	lists?: number[];
	status?: number;
	description?: string;
}
export interface TaskFilters {
	category?: number;
	dueDateOn?: Date;
	dueDateBefore?: Date;
	dueDateAfter?: Date;
	priority?: number;
	list?: number;
	status?: number;
}
export interface TaskSorts {
	sort?: string;
	order?: string;
}
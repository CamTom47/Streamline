export interface NewTask {
	title: string;
	userid: number;
	category?: number;
	datecreated: Date;
	duedate?: Date;
	priority: number;
	lists?: number[];
	status: number;
	description?: string;
}
export interface UpdateTask {
	title?: string;
	category?: number;
	duedate?: Date;
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
export interface TaskSearches {
	sort?: string;
	order?: string;
}
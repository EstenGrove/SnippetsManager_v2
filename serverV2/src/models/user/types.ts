export interface IUserDBRecord {
	user_id: number;
	username: string;
	email: string;
	password: string;
	created_date: Date;
	updated_date: Date;
	created_by: string;
	updated_by: string;
	last_login_date: Date | null;
	is_active: boolean;
}

export interface IUserServerRecord {
	UserID: IUserDBRecord["user_id"];
	Username: IUserDBRecord["username"];
	Email: IUserDBRecord["email"];
	Password: IUserDBRecord["password"];
	CreatedDate: IUserDBRecord["created_date"];
	UpdatedDate: IUserDBRecord["updated_date"];
	CreatedBy: IUserDBRecord["created_by"];
	UpdatedBy: IUserDBRecord["updated_by"];
	LastLoginDate: IUserDBRecord["last_login_date"];
	IsActive: IUserDBRecord["is_active"];
}

export interface ICurrentUser {
	userID: string | null;
	username: string | null;
	email: string | null;
	password: string | null;
	isAdmin?: boolean;
	isTeamLead?: boolean;
	createdDate: Date | string | null;
	updatedDate: Date | string | null;
	createdBy: string | null;
	updatedBy: string | null;
}

export interface IUserDBRecord {
	user_id: string;
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

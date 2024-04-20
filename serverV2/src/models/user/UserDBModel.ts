import { IUserDBRecord, IUserServerRecord } from "./types";

// CONVERTS DATA SHAPE FROM 'SERVER' FORMAT INTO 'DATABASE' FORMAT
class UserDBModel {
	model: IUserDBRecord;
	user_id: IUserDBRecord["user_id"];
	username: IUserDBRecord["username"];
	email: IUserDBRecord["email"];
	password: IUserDBRecord["password"];
	created_date: IUserDBRecord["created_date"];
	updated_date: IUserDBRecord["updated_date"];
	created_by: IUserDBRecord["created_by"];
	updated_by: IUserDBRecord["updated_by"];
	last_login_date: IUserDBRecord["last_login_date"];
	is_active: IUserDBRecord["is_active"];

	constructor({
		UserID,
		Username,
		Email,
		Password,
		CreatedDate,
		UpdatedDate,
		CreatedBy,
		UpdatedBy,
		LastLoginDate,
		IsActive,
	}: IUserServerRecord) {
		this.user_id = UserID;
		this.username = Username;
		this.email = Email;
		this.password = Password;
		this.created_date = CreatedDate;
		this.updated_date = UpdatedDate;
		this.created_by = CreatedBy;
		this.updated_by = UpdatedBy;
		this.last_login_date = LastLoginDate;
		this.is_active = IsActive;

		this.model = {
			user_id: this.user_id,
			username: this.username,
			email: this.email,
			password: this.password,
			created_date: this.created_date,
			updated_date: this.updated_date,
			created_by: this.created_by,
			updated_by: this.updated_by,
			last_login_date: this.last_login_date,
			is_active: this.is_active,
		};
	}

	getModel() {
		return this.model;
	}
}

module.exports = {
	UserDBModel,
};

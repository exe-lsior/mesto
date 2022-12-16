export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._id = '';
    }

    getUserId() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar.src
        };
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._name.textContent = name;
        this._description.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
    }
};
export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
        //console.log(this._avatar.src)
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar.src
        };
    }

    setUserInfo(userInfo) {
        this._name.textContent = userInfo.popup_name;
        this._description.textContent = userInfo.popup_description;
        this._avatar.src = userInfo.popup_avatar;
    }
};
var uid = require("shortid");

/**
 * @class DomainEvent
 * @param {string} name - event's name
 * @param {Actor} actor
 * @param {{}} data
 * @param {string | boolean} [contextId] - if true auto generate a context'ID , or string ID.
 */
class DomainEvent {

    constructor(name, actor, data, contextId) {

        this.actorId = actor.id;

        this.actorType = actor.type;

        /**
         * @member id
         * @memberof DomainEvent.prototype
         * @type {string}
         * @readonly
         */
        this.id = uid();

        /**
         * @member data
         * @memberof DomainEvent.prototype
         * @type {*}
         * @readonly
         */
        this.data = data;

        /**
         * @member name
         * @memberof DomainEvent.prototype
         * @type {string}
         * @readonly
         */
        this.name = name;

        /**
         *
         * @member contextId
         * @memberof DomainEvent.prototype
         * @type {string | boolean}
         * @readonly
         */
        this.contextId = contextId === true ? uid() : (typeof contextId === "string" ? contextId : null);

        /**
         * create time
         * @member date
         * @memberof DomainEvent.prototype
         * @type {number}
         * @readonly
         */
        this.date = Date.now();

        Object.freeze(this);

    }
}

module.exports = DomainEvent;
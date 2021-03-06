System.register("../../lib/Repository", [], function() {
  "use strict";
  var __moduleName = "../../lib/Repository";
  var thunkify = require("thunkify");
  var Emitter = require("events").EventEmitter;
  var cache = Symbol("cache");
  var Repository = function Repository(Actor, eventstore) {
    this.Actor = Actor;
    this.eventstore = eventstore;
    this.getFromSnapShot = thunkify(this.eventstore.getFromSnapshot).bind(this.eventstore);
    this.createSnapshot = thunkify(this.eventstore.createSnapshot).bind(this.eventstore);
    this[cache] = {};
  };
  ($traceurRuntime.createClass)(Repository, {
    create: $traceurRuntime.initGeneratorFunction(function $__1(data) {
      var actor,
          result,
          stream;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              actor = new this.Actor(data);
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 2;
              return this.getFromSnapShot(actor.id);
            case 2:
              result = $ctx.sent;
              $ctx.state = 4;
              break;
            case 4:
              stream = result[1];
              $ctx.state = 14;
              break;
            case 14:
              $ctx.state = 6;
              return this.createSnapshot({
                streamId: actor.id,
                data: this.Actor.toJSON(actor),
                revision: stream.lastRevision
              });
            case 6:
              $ctx.maybeThrow();
              $ctx.state = 8;
              break;
            case 8:
              this[cache][actor.id] = actor;
              $ctx.state = 16;
              break;
            case 16:
              $ctx.returnValue = actor;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    }),
    clear: function(id) {
      delete this[cache][id];
    },
    getFromCache: function(id) {
      return this[cache][id];
    },
    get: $traceurRuntime.initGeneratorFunction(function $__2(id) {
      var actor,
          returnFun,
          result,
          snapshot,
          stream,
          snap,
          history,
          historyv;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              returnFun = function() {
                if (actor && actor.data.alive === false) {
                  return null;
                } else {
                  return actor;
                }
              };
              $ctx.state = 17;
              break;
            case 17:
              $ctx.state = (actor = this.getFromCache(id)) ? 1 : 2;
              break;
            case 1:
              $ctx.returnValue = returnFun();
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 5;
              return this.getFromSnapShot(id);
            case 5:
              result = $ctx.sent;
              $ctx.state = 7;
              break;
            case 7:
              $ctx.state = (actor = this.getFromCache(id)) ? 8 : 9;
              break;
            case 8:
              $ctx.returnValue = returnFun();
              $ctx.state = -2;
              break;
            case 9:
              snapshot = result[0];
              stream = result[1];
              $ctx.state = 19;
              break;
            case 19:
              $ctx.state = (!snapshot) ? 11 : 12;
              break;
            case 11:
              $ctx.state = -2;
              break;
            case 12:
              snap = snapshot.data;
              actor = new this.Actor(snap);
              history = stream.events;
              historyv = [];
              history.forEach(function(e) {
                historyv.push(e.payload);
              });
              actor.loadEvents(historyv);
              this[cache][actor.id] = actor;
              $ctx.state = 21;
              break;
            case 21:
              $ctx.returnValue = returnFun();
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__2, this);
    })
  }, {}, Emitter);
  module.exports = Repository;
  return {};
});
System.get("../../lib/Repository" + '');

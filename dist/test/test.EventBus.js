System.register("../../test/test.EventBus", [], function() {
  "use strict";
  var __moduleName = "../../test/test.EventBus";
  require("traceur");
  var Repository = require("../lib/Repository");
  var Actor = require("../lib/Actor");
  var ES = require("eventstore");
  var es = new ES();
  var EventBus = require("../lib/EventBus");
  var ActorListener = require("../lib/ActorListener");
  var co = require("co");
  var should = require("should");
  describe("EventBus", function() {
    var bus,
        actor,
        repos = {};
    it("#new", function() {
      bus = new EventBus(es, repos, new ActorListener);
    });
    it("#init", function(done) {
      var User = Actor.extend({
        type: "User",
        changeName: function(name) {
          this.apply("changeName", name);
        },
        finish: function(name) {
          this.apply("finish");
        },
        when: function(event, set) {
          if (event.name === "finish") {
            this._data.finish = "ok";
          }
        }
      });
      var uid;
      repos[User.type] = new Repository(User, es);
      co($traceurRuntime.initGeneratorFunction(function $__0() {
        return $traceurRuntime.createGeneratorInstance(function($ctx) {
          while (true)
            switch ($ctx.state) {
              case 0:
                $ctx.state = 2;
                return repos[User.type].create({name: "leo"});
              case 2:
                actor = $ctx.sent;
                $ctx.state = 4;
                break;
              case 4:
                done();
                $ctx.state = -2;
                break;
              default:
                return $ctx.end();
            }
        }, $__0, this);
      }))();
    });
    it("#publsh", function(done) {
      actor.changeName("bright");
      actor.uncommittedEvents.length.should.eql(1);
      bus.publish(actor);
      setTimeout(function() {
        actor.uncommittedEvents.should.eql([]);
        done();
      }, 10);
    });
  });
  return {};
});
System.get("../../test/test.EventBus" + '');

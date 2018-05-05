AFRAME.registerComponent('propagate', {
  schema: {
    events: {type: 'array', default: []},
  },
  init: function () {
    var self  = this
    var parentEntity = this.el

    parentEntity.addEventListener('click', function (e) {
      walk(parentEntity, function (child) {
        emitEvents(child)
      })
    })

    function walk(node, func) {
       var children = node.children;
       for (var i = 0; i < children.length; i++) {
         walk(children[i], func);
       }
       func(node);
    }

    function emitEvents (entity) {
      for (var i = 0; i < self.data.events.length; i++) {
        entity.emit(self.data.events[i])
      }
    }
  }
});
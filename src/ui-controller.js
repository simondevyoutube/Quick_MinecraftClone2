import {entity} from './entity.js';

import {texture_defs} from './texture-defs.js';
import {hack_defs} from './hack-defs.js';


export const ui_controller = (() => {

  class UIController extends entity.Component {
    static CLASS_NAME = 'UIController';

    get NAME() {
      return UIController.CLASS_NAME;
    }

    constructor() {
      super();
    }

    InitEntity() {
      this.iconBar_ = document.getElementById('icon-bar');
      this.icons_ = [];

      const blockTypes = [
          'dirt', 'stone', 'sand', 'grass', 'snow', 'moon', 'tree_bark', 'tree_leaves'
      ];

      for (let b of blockTypes) {
        const e = document.createElement('DIV');

        let textureName = texture_defs.DEFS[b].texture;
        if (textureName instanceof Array) {
          textureName = textureName[2];
        }

        e.className = 'icon-bar-item';
        e.style = "background-image: url('./resources/minecraft/textures/blocks/" + textureName + "');";
        e.blockType = b;

        this.iconBar_.appendChild(e);
        this.icons_.push(e);
      }

      this.toolTypes_ = ['build', 'break'];
      this.toolIndex_ = 0;
      this.iconIndex_ = 0;
      this.icons_[0].classList.toggle('highlight');
      this.UpdateToolBlockType_();
      this.UpdateToolType_();

      if (!hack_defs.showTools) {
        this.iconBar_.style.display = 'none';
      }
    }

    CycleBuildIcon_(dir) {
      this.icons_[this.iconIndex_].classList.remove('highlight');
      this.iconIndex_ = (this.iconIndex_ + this.icons_.length + dir) % this.icons_.length;
      this.icons_[this.iconIndex_].classList.toggle('highlight');

      this.UpdateToolBlockType_();
    }

    CycleTool_() {
      this.toolIndex_ = (this.toolIndex_ + 1) % this.toolTypes_.length;
      this.UpdateToolType_();
    }

    UpdateToolBlockType_() {
      const player = this.FindEntity('player');
      player.Broadcast({
          topic: 'ui.blockChanged',
          value: this.icons_[this.iconIndex_].blockType,
      });
    }

    UpdateToolType_() {
      const player = this.FindEntity('player');
      player.Broadcast({
          topic: 'ui.toolChanged',
          value: this.toolTypes_[this.toolIndex_],
      });
    }
  };

  return {
      UIController: UIController,
  };
})();
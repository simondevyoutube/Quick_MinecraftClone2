
import {voxel_block_builder} from './voxel-block-builder.js';


const _BLOCK = new voxel_block_builder.VoxelBlockBuilder();

self.onmessage = (msg) => {
  if (msg.data.subject == 'build_chunk') {
    _BLOCK.Init(msg.data.params);

    const rebuiltData = _BLOCK.Rebuild();
    const buffers = [];
    for (let k in rebuiltData.opaque) {
      buffers.push(rebuiltData.opaque[k].buffer);
    }
    for (let k in rebuiltData.transparent) {
      buffers.push(rebuiltData.transparent[k].buffer);
    }
    self.postMessage({subject: 'build_chunk_result', data: rebuiltData}, buffers);
  }
}

export const voxel_builder_threaded_worker = (() => {})();
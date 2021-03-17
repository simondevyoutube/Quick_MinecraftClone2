
import {voxel_block_builder} from './voxel-block-builder.js';


const _BLOCK = new voxel_block_builder.VoxelBlockBuilder();

self.onmessage = (msg) => {
  if (msg.data.subject == 'build_chunk') {
    _BLOCK.Init(msg.data.params);

    const rebuiltData = _BLOCK.Rebuild();
    self.postMessage({subject: 'build_chunk_result', data: rebuiltData});
  }
}

export const voxel_builder_threaded_worker = (() => {})();
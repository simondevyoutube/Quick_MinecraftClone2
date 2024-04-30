export const worker_pool = (() => {

  let _IDS = 0;

  class WorkerThread {
    constructor() {
      this.worker_ = new Worker(new URL('/src/voxel-builder-threaded-worker.js', import.meta.url), {type: 'module'});
      this.worker_.onmessage = (e) => {
        this._OnMessage(e);
      };
      this.resolve_ = null;
      this.id_ = _IDS++;
    }

    _OnMessage(e) {
      const resolve = this.resolve_;
      this.resolve_ = null;
      resolve(e.data);
    }

    get id() {
      return this.id_;
    }

    postMessage(s, resolve) {
      this.resolve_ = resolve;
      this.worker_.postMessage(s);
    }
  }

  class WorkerPool {
    constructor(sz) {
      this.workers_ = [...Array(sz)].map(_ => new WorkerThread());
      this.free_ = [...this.workers_];
      this.busy_ = {};
      this.queue_ = [];
    }

    get length() {
      return this.workers_.length;
    }

    get Busy() {
      return this.queue_.length > 0 || Object.keys(this.busy_).length > 0;
    }

    Enqueue(workItem, resolve) {
      this.queue_.push([workItem, resolve]);
      this.PumpQueue_();
    }

    PumpQueue_() {
      while (this.free_.length > 0 && this.queue_.length > 0) {
        const w = this.free_.pop();
        this.busy_[w.id] = w;

        const [workItem, workResolve] = this.queue_.shift();

        w.postMessage(workItem, (v) => {
          delete this.busy_[w.id];
          this.free_.push(w);
          workResolve(v);
          this.PumpQueue_();
        });
      }
    }
  }

  return {
      WorkerPool: WorkerPool,
  };
})();
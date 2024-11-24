export const parseWorkerList = (workers) =>
  workers.split(',').map((worker) =>
    worker.trim(),
  );

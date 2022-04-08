export function run(): Promise<void> {

    return require(process.env['MOCHA_WORKER_PATH']!);

}

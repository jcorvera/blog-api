import { argv } from './config/yargs';
import { OptionsAndArguments } from './utils/interfaces';
import { executeCommand } from './scripts/executeCommand';

interface ArgumentsFromYargs {
  [x: string]: unknown;
  d: boolean | undefined;
  e: boolean | undefined;
  _: (string | number)[];
  $0: string;
}

const dataArgumentsAndOptions = async (args: ArgumentsFromYargs): Promise<OptionsAndArguments> => {
  const { d, e, _: file } = args;
  return {
    file: file[0].toString(),
    decode: d,
    encode: e
  };
};

// Main function self-Invoking
(async () => {
  const responseOfDataArgumentsAndOptions = await dataArgumentsAndOptions(argv);
  await executeCommand(responseOfDataArgumentsAndOptions);
})();

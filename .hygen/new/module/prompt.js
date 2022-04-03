'use strict';

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Name:',
          validate(value) {
            if (!value.length) {
              return 'Module must have a name.';
            }
            return true;
          },
        },
        {
          type: 'MultiSelect',
          name: 'blocks',
          message: 'Blocks:',
          initial: [
            'Controller',
            'CreateDTO',
            'Entity',
            'Repository',
            'UpdateDTO',
          ],
          choices: [
            {
              name: 'Controller',
              value: 'controller',
            },

            {
              name: 'CreateDTO',
              value: 'create-dto',
            },

            {
              name: 'Entity',
              value: 'entity',
            },

            {
              name: 'Repository',
              value: 'repository',
            },

            {
              name: 'UpdateDTO',
              value: 'update-dto',
            },
          ],
        },
      ])
      .then((answer) => {
        //// For debugging
        // console.log(answer)
        return answer;
      });
  },
};

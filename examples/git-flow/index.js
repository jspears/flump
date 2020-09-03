module.exports = {
    prompts : {
        switchTo: {
            type : 'input',
            shopt: 's',
            validate(v) {

            }
        },
        branch  : {
            type : 'select',
            shopt: 'b',
            options() {

            }
        }
    },
    commands: {
        checkout: [
            {
                command: `git checkout {{branch}}`
            },
            {
                command: 'npm install'
            }
        ]
    }
}
it('can handle commands using async/await', async function () {
    const inputElement = await $('#input')
    let value = await inputElement.getValue()
    console.log(value) // outputs: some value
})
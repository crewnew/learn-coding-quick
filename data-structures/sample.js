const someVariable = {
    property_one: 'value one',
    property_two: [
        {
            one: 'one_one',
            two: 'pne_two'
        },
        {
            one: 'two_one',
            two: 'two_two'
        },
        {
            one: 'three_one',
            two: 'three_two'
        }
    ]
}

console.log(someVariable.property_two[2].one) // should console.log: "three_one"
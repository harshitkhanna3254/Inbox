const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

// https://rinkeby.infura.io/v3/aa7d71fbdb0a4ad883452f3a9ec2e8b8
let acccounts;
let inbox;
beforeEach(async () => {
//Get a list of all accounts
    accounts = await web3.eth.getAccounts()
//Use one of the accounts to Deploy a contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data : bytecode, arguments : ['Hi there!']})
        .send({from : accounts[0], gas : '1000000'});
})

describe('Inbox',() => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has default message',async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hi there!')
    })

    it('setMessage Working', async () => {
        await inbox.methods.setMessage('message changed').send({from : accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message, 'message changed')
    })
})







// class Car{

//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car Testing', () => {

//     it('is it parked?', () => {
//         assert.equal(car.park(), 'stopped')
//     })

//     it('can drive?', () => {
//         assert.equal(car.drive(),'vroom')
//     })
// })
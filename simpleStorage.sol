//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract simpleStorage {
    uint256 public fav_num;

    // People public people = People({fav_num : 10, name : "Parth"});
    // People public people1 = People({fav_num : 22, name : "lavi"});
    // People public people2 = People({fav_num : 33 , name : "bhaiya"});

    //struct
    struct People {
        uint256 fav_num;
        string name;
    }

    //Mapping the variables of people array.
    mapping(string => uint256) public nametonumber;

    //declare an array.
    People[] public people;

    //passing values in array
    function addmember(uint256 _favnum, string memory namee) public {
        people.push(People(_favnum, namee));
        nametonumber[namee] = _favnum;
    }

    function store(uint256 _favnum) public virtual {
        fav_num = _favnum;
        retrieve();
    }

    function retrieve() public view returns (uint256) {
        return fav_num;
    }

    // declare and initializing the array favnum;
    uint256[] public favnum;

    function addnum(uint256 _favnum) public {
        favnum.push(_favnum);
    }
}

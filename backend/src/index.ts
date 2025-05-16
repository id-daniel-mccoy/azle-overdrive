import {
    blob,
    Canister,
    ic,
    Err,
    nat64,
    Ok,
    Opt,
    Principal,
    query,
    Record,
    Result,
    StableBTreeMap,
    text,
    update,
    Variant,
    Vec,
    bool,
    nat,
    Tuple,
    None,
    Some,
    Void,
    nat8
} from 'azle/experimental';

const userAccount = Record({
    username: text,
    bio: text
});
export type UserAccount = typeof userAccount.tsType;

const userMap = StableBTreeMap<text, UserAccount>(0);

const createUser = async(username: text): Promise<text> => {
    const user = ic.caller().toString();
    const userAccount: UserAccount = {
        username: username,
        bio: 'This is a bio'
    };
    userMap.insert(user, userAccount);
    return `User ${username} created successfully`;
}

const getAllUsers = async(): Promise<Vec<UserAccount>> => {
    const users: Vec<UserAccount> = [];
    const userKeys = userMap.keys();
    for (let i = 0; i < userKeys.length; i++) {
        const userKey = userKeys[i];
        const userAccount = userMap.get(userKey);
        if (userAccount) {
            users.push(userAccount);
        }
    }
    return users;
}

const getAllData = async(): Promise<Vec<[text, UserAccount]>> => {
    const allData = userMap.items() as Vec<[text, UserAccount]>;
    return allData;
}

const who = async(): Promise<text> => {
    return ic.caller().toString();
}

export default Canister ({
    createUser: update([text], text, (createUser)),
    getAllUsers: query([], Vec(userAccount), (getAllUsers)),
    who: query([], text, (who)),
    getAllData: query([], Vec(Tuple(text, userAccount)), (getAllData))
})

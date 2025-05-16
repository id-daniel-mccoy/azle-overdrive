import { useState } from 'react';
import { HttpAgent, Actor, ActorSubclass } from '@dfinity/agent';
import { _SERVICE } from './interfaces/backend/backend.did';
import * as backend from './interfaces/backend';
import { PlugLogin, Types } from 'ic-auth';

// erc7y-3yaaa-aaaac-qaira-cai

function App() {

  const [currentUser, setCurrentUser] = useState<Types.UserObject | null>(null);
  const [currentActor, setCurrentActor] = useState<any>(null);

  const plugLogin = async() => {
    const canisterId = 'erc7y-3yaaa-aaaac-qaira-cai';
    const whitelist = [canisterId];
    const user: Types.UserObject = await PlugLogin(whitelist);
    setCurrentUser(user);
    const actor: ActorSubclass<_SERVICE> = Actor.createActor(backend.idlFactory, {
      //@ts-ignore
      agent: user!.agent,
      canisterId: 'erc7y-3yaaa-aaaac-qaira-cai'
    })
    setCurrentActor(actor);
    console.log(user);
  }

  const who = async() => {
    const result = await currentActor.who();
    console.log(result);
  }

  // no auth
  const basicAgent = new HttpAgent({
    host: 'https://ic0.app',
  })
  const actor: ActorSubclass<_SERVICE> = Actor.createActor(backend.idlFactory, {
    agent: basicAgent,
    canisterId: 'erc7y-3yaaa-aaaac-qaira-cai'
  })

  const getAllUsers = async() => {
    const users = await actor.getAllUsers();
    console.log(users);
  }

  const getAllData = async() => {
    const data = await actor.getAllData();
    console.log(data);
  }

  const createNewUser = async() => {
    console.log('Creating new user...');
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const result = await actor.createUser(username);
    console.log(result);
  }

  return (
    <div className='main'>
      <h2>Welcome To The Internet Computer</h2>
      <div className='content'>
        <p>Say Hello</p>
        <button onClick={getAllUsers}>Test</button>
        <p>Create User</p>
        <input type='text' placeholder='Username' id='username'/>
        <button onClick={createNewUser}>Create</button>
        <p>Login</p>
        <button onClick={plugLogin}>Login with Plug</button>
        <p>Current User: {currentUser?.principal}</p>
        <button onClick={who}>Who</button>
        <button onClick={getAllData}>Get All Data</button>
      </div>
    </div>
  );
}

export default App;
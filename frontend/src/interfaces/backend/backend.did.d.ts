import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'createUser' : ActorMethod<[string], string>,
  'getAllData' : ActorMethod<
    [],
    Array<[string, { 'bio' : string, 'username' : string }]>
  >,
  'getAllUsers' : ActorMethod<
    [],
    Array<{ 'bio' : string, 'username' : string }>
  >,
  'who' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

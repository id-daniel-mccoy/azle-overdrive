export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createUser' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getAllData' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Tuple(
              IDL.Text,
              IDL.Record({ 'bio' : IDL.Text, 'username' : IDL.Text }),
            )
          ),
        ],
        ['query'],
      ),
    'getAllUsers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Record({ 'bio' : IDL.Text, 'username' : IDL.Text }))],
        ['query'],
      ),
    'who' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

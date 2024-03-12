declare var process: {
  env: {
    NODE_ENV: string;
  };
};

import tw from 'twin.macro';
import styled from 'styled-components';
import './App.css'

const StyledApp = styled.div`
  
  .my-class {
    ${tw`text-blue-500 bg-gray-200 p-4`}
  }
`;

function App() {

  return (
    <>

      <StyledApp>
        <div className='my-class'>Test</div>
      </StyledApp>
    </>
  )
}

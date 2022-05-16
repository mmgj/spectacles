import React from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import PaneLabel from '../PaneLabel';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

// import './prism.css';
// import './prism-twilight.css';
// import './prism-okaida.css';

const StyledSection = styled.section`
  flex: 1;
  width: 100%;
  position: relative;
  height: 50%;
  color: ${(p) => {
    return p.theme?.sanity?.color?.base?.fg || 'transparent';
  }};
  textarea {
    &:focus {
      outline: none;
    }
  }
`;

const EditorPane = ({ label, style, ...props }) => {
  return (
    <StyledSection>
      {label && <PaneLabel label={label} />}

      <Editor
        className='editor'
        padding={15}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          flex: 1,
          width: '100%',
          lineHeight: 1.5,
          ...style,
        }}
        {...props}
      />
    </StyledSection>
  );
};

export default EditorPane;

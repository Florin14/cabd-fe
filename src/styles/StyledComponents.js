import styled from "@emotion/styled";


export const StyledContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

// export const StyledContainer = styled.div`
//   padding: 20px;
//   max-width: 800px;
//   margin: auto;
//   text-align: center;
// `;

// export const StyledButton = styled.button`
//   padding: 10px 20px;
//   background-color: #1976d2;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// export const StyledInput = styled.input`
//   padding: 10px;
//   margin: 10px;
//   width: 200px;
// `;

export const StyledNavBar = styled.div`
  background-color: #1976d2;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

export const StyledNavButton = styled.button`
  background-color: white;
  color: #1976d2;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

export const StyledCard = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px;
  border-radius: 5px;
`;

export const StyledSelect = styled.select`
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;
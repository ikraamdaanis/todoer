import styled from 'styled-components/macro'

export const TaskListItem = styled.li`
  font-size: 14px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);

  &.hide {
    display: none;
  }

  &:hover {
  }
`

export const TaskItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  cursor: pointer;

  &:hover {
    .toggler {
      opacity: 1;
    }
  }
`

export const TaskCheck = styled.div`
  width: 30px;
  display: flex;
  align-items: center;
  height: 100%;

  &:hover {
    svg {
      display: block;
    }
  }

  .circle {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #737373;
    cursor: pointer;

    &:hover {
      background: #4b4b4b;
    }
  }

  svg {
    display: none;
    position: relative;
    transform: translate(-4.5px, -3.5px);
  }
`

export const TaskDetails = styled.div`
  display: flex;
  align-items: center;
`

export const TaskDescription = styled.p`
  flex: 1;
  padding: 8px 0;
  margin-right: 30px;
  width: 100%;
  text-align: left;
  text-decoration: none;
  font-size: 14px;
  min-height: 24px;
  line-height: 21px;
  word-wrap: break-word;
  word-break: break-word;
  color: hsla(0, 0%, 100%, 0.87);
  font-weight: 300;
`

export const TaskMenuContainer = styled.div`
  display: grid;
  place-content: center;
  position: relative;
  padding-right: 0.5rem;

  .toggler {
    opacity: 0;
    height: 24px;
    width: 24px;
    display: grid;
    place-content: center;
    border-radius: 4px;
    transition: 0.2s ease-in-out;

    &:hover {
      background: #353535;
    }
  }
`

export const TaskMenu = styled.div`
  position: absolute;
  z-index: 10000;
  top: 15px;
  right: 0;
  width: 250px;
  background: #282828;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  border-radius: 3px;
  padding: 4px 0;
`

export const TaskMenuList = styled.ul``

export const DeleteButton = styled.li`
  color: hsla(0, 0%, 100%, 0.56);
  text-shadow: none;
  background: none;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  transition: 0.2s ease-in-out;
  outline: none;
  padding: 4px 10px;

  &:hover {
    background-color: #353535;

    svg {
      color: var(--light-red);
    }

    span {
      color: var(--light-red);
    }
  }

  svg {
    color: hsla(0, 0%, 100%, 0.56);
    margin-right: 10px;
  }

  span {
    font-size: 13px;
    color: hsla(0, 0%, 100%, 0.87);
    font-weight: 300;
  }
`

export const TaskTags = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 6px 30px;
  height: 16px;
  width: 100%;
  font-size: 12px;
  transform: translateY(-4px);

  .date {
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
  }
`

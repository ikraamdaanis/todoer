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

  .complete {
    background: #808080;

    &:hover {
      background: #808080;
    }

    svg {
      display: block;
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

  &.complete {
    text-decoration: line-through;
    color: grey;
  }
`

export const TaskMenuContainer = styled.div`
  display: grid;
  place-content: center;
  position: relative;

  .toggler {
    opacity: 0;
    height: 24px;
    width: 24px;
    display: grid;
    place-content: center;
    border-radius: 4px;
    transition: 0.2s ease-in-out;
    position: absolute;
    top: -12px;
    right: -30px;

    &:hover {
      background: #353535;
    }
  }
`

export const TaskMenu = styled.div`
  position: absolute;
  z-index: 10000;
  top: 0px;
  right: 0;
  width: 250px;
  background: #282828;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);
  border-radius: 3px;
  padding: 4px 0;

  &.project-menu {
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0s ease-in-out 0.01s;

    &.open {
      opacity: 1;
      pointer-events: all;
    }
  }
`

export const MenuList = styled.ul``

export const MenuItem = styled.li`
  color: hsla(0, 0%, 100%, 0.56);
  text-shadow: none;
  background: none;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  outline: none;
  padding: 4px 10px;

  &:hover {
    background-color: #353535;

    &.delete {
      svg {
        color: var(--light-red);
      }

      span {
        color: var(--light-red);
      }
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
  padding: 0 0 6px 30px;
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

  .project {
    margin-left: auto;

    a {
      display: flex;
      align-items: center;
      transition: 0.2s ease-in-out;

      &:hover {
        small {
          color: hsla(0, 0%, 100%, 0.87);
        }
      }
    }

    small {
      color: hsla(0, 0%, 100%, 0.56);
      font-size: 12px;
      font-weight: 300;
      transform: translateY(-1.5px);
    }

    .inbox {
      margin-left: 1px;
      transform: scale(0.7);
      color: #246fe0;
    }

    .dot {
      transform: translateX(-2px);
      margin-left: 4px;
    }
  }
`

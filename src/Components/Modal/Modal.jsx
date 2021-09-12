// import { Component } from "react";
// import { Overlay, Modalstyle } from './Modal.styled'

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === "Escape") {
//       this.props.onClose;
//     }
//   };

//   handleOverlayClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose;
//     }
//   };

//   render() {

//     return (
//       <Overlay onClick={this.handleBackdropClick}>
//         <Modalstyle>
//           <img src={this.props.modalSrc} alt="" />
//         </Modalstyle>
//       </Overlay>
//     );
//   }
// }

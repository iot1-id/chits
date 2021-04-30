
// <Modal isOpen={toggle} toggle={() => setToggle(false)}>
//   <div className="modal-header justify-content-center">
//     {/* {console.log("askfkajnakjn")} */}
//     <button className="close" type="button" onClick={() => setToggle(false)}>
//       {/* <i className="now-ui-icons ui-1_simple-remove"></i> */}
//     </button>
//     <h4 className="title">Change Group Name</h4>
//   </div>
//   <ModalBody>
//     <Row>
//       <Col>
//         <h3>Enter Name: </h3>
//       </Col>
//       <Col>
//         <Form.Control
//           type="text"
//           placeholder="New Name"
//           onChange={(e) => setGroupName(e.target.value)}
//           style={{ maxWidth: "80%" }}
//         />
//         {/* {console.log(groupName)} */}
//       </Col>
//     </Row>
//     <Row>
//       <button className="btn-grad3" onClick={() => changeName(data.refId)}>
//         Change Group Name
//       </button>
//       {data.refId}
//     </Row>
//   </ModalBody>
// </Modal>;
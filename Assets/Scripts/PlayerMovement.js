#pragma strict

/// This script moves the character controller forward 
	/// and sideways based on the arrow keys.
	/// It also jumps when pressing space.
	/// Make sure to attach a character controller to the same game object.
	/// It is recommended that you make only one call to Move or SimpleMove per frame.	

	var speed : float = 10.0;
	var jumpSpeed : float = 10.0;
	var gravity : float = 10.0;
	
	var SIDE = "Side";
	var WALK = "Walk";
	var JUMP = "Jump";

	var controller : CharacterController = GetComponent.<CharacterController>();

	private var moveDirection : Vector3 = Vector3.zero;

	function Update() {
		
		moveDirection.x = Input.GetAxis(SIDE);
		moveDirection.z = Input.GetAxis(WALK);

		if (moveDirection.magnitude > 1) {
			moveDirection.Normalize();
		}

		moveDirection = transform.TransformDirection(moveDirection);
		
		moveDirection *= speed;

		
		if (controller.isGrounded) {
			// We are grounded, so recalculate
			// move direction directly from axes
			
			if (Input.GetButton (JUMP)) {
				moveDirection.y = jumpSpeed;
			}
		} else {
			// Apply gravity
			moveDirection.y -= gravity * Time.deltaTime;
		}
		
		// Control camera with separate script!
		transform.Rotate(0, Input.GetAxis("Mouse X")*20, 0);
		
		// Move the controller
		controller.Move(moveDirection * Time.deltaTime);
	}
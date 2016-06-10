	return(
	<div id="retro_body">
		<Header 
		user_name={localStorage.getItem("user_name")} 
		title={this.state.project_name + " - " + this.state.retro_date} 
		maxVotes={this.state.MaxUserVotes}
		userVotes={this.state.UserCurrentVotes}/>

		<br/>	
		<div className="modal" onClick={this.handleClick}>
	      {
	        this.state.modal_show &&
	        <ModalContainer onClose={this.handleClose}>
	          <ModalDialog onClose={this.handleClose}>
	          <div> 
	          {
	          	this.state.AddActionItem ?
	            <form onSubmit={this.handleAddActionItem} >
	            	<h1>Add Action Item</h1>
	            	<input type="text"  ref="actionItem"/>
	            	<button type="submit">Submit</button>
	            </form>
	            :
	            <form onSubmit={this.handleEditItem} >
	            	<h1>Description</h1>
	            	<input type="text" onChange={this.handleChangeText} value={this.state.current_item_text}  ref="editRetroItem"/>
	            	<button type="submit">Submit</button>
	            </form>
	          }
	        </div>
	          </ModalDialog>
	        </ModalContainer>
	      }
	    </div>
		<div className="desktop_retro_columns">
			
			<RetroColumn HeaderText="Happy :)" 
				handleAdd={this.addRetroItem} 
				columnId={0} 
				items={this.state.retroItems[0]} 
				showModal={this.state.modal_show}
				handleShowModal={this.handleShowModal}
				trackerTest={this.addActionItemToTracker}
				handleActionModal={this.handleActionModal}
				handleUnVote={this.handleUnVote}
				handleVote={this.handleVote}
				actionItems={this.state.actionItems} />
			<RetroColumn 
				HeaderText="Puzzler :|"  
				handleAdd={this.addRetroItem} 
				columnId={1} 
				items={this.state.retroItems[1]} 
				showModal={this.state.modal_show}
				handleShowModal={this.handleShowModal} 
				trackerTest={this.addActionItemToTracker}
				handleActionModal={this.handleActionModal}
				handleUnVote={this.handleUnVote}					
				handleVote={this.handleVote}
				actionItems={this.state.actionItems}/>
			<RetroColumn 
				HeaderText="Sad :(" 
				handleAdd={this.addRetroItem} 
				columnId={2} 
				items={this.state.retroItems[2]} 
				showModal={this.state.modal_show} 
				handleShowModal={this.handleShowModal} 
				trackerTest={this.addActionItemToTracker}
				handleActionModal={this.handleActionModal}
				handleVote={this.handleVote}
				handleUnVote={this.handleUnVote}
				actionItems={this.state.actionItems}/>
			<ActionColumn 
				HeaderText="Action Items" 
				columnId={3} 
				items={this.state.actionItems} 
				showModal={this.state.modal_show} 
				handleShowActionEditModal={this.handleShowActionEditModal} 
				trackerTest={this.addActionItemToTracker}
				handleActionModal={this.handleActionModal}/>
		</div>
	</div>
	);
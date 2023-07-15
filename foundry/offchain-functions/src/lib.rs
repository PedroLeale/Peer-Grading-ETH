pub mod participant;

use ethereum_types::*;
use crate::participant::*;
#[derive(Debug, Clone)]
pub struct Contract{
    participants: Vec<Participant>,
    assignments: Vec<U256>,
    global_seed: [u8;32],
}

impl Contract {
    pub fn new(global_seed: [u8;32]) -> Self {
        Self {
            participants: vec![],
            assignments: vec![],
            global_seed,
        }
    }

    pub fn add_participant(&mut self, participant: Participant) {
        self.participants.push(participant);
    }

    pub fn add_assignments(&mut self, assignments: Vec<U256>) {
        self.assignments = assignments;
    }

    pub fn distribute_grading(&mut self) {
        let n = self.participants.len();
        for i in 0..n {
            self.participants[i].grade(n, self.global_seed);
        }
    }

    pub fn get_participants(&self) -> Vec<Participant> {
        self.participants.clone()
    }

}
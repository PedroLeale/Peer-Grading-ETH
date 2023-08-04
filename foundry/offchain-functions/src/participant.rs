use ethereum_types::*;
use rand::rngs::StdRng;
use rand::{Rng, SeedableRng};

#[derive(Debug, Clone)]
pub struct Participant {
    commit: H32,
    penalty: U256,
    assignment_id: U256,
    assigned: Vec<U256>,
    grading: Vec<U256>,
}

impl Participant {
    pub fn new(commit: H32, penalty: U256, assignment_id: U256) -> Self {
        Self {
            commit,
            penalty,
            assignment_id,
            assigned: vec![],
            grading: vec![],
        }
    }

    pub fn grade(&mut self, n: usize, global_seed: [u8; 32]) {
        let k = (n + 1) / 2;
        let mut seed = global_seed;
        let mut rng = StdRng::from_seed(seed);
        let mut tasks: Vec<U256> = vec![U256::zero(); k];
        let mut i = 0;

        while i < k {
            seed = rng.gen();
            let task = U256::from(seed) % U256::from(n);
            if (task != self.assignment_id)
                && (!tasks.contains(&task))
                && (!self.assigned.contains(&task))
            {
                tasks[i] = task;
                i += 1;
            }
        }

        self.grading = tasks;
    }

    pub fn get_assignment_id(&self) -> U256 {
        self.assignment_id
    }

    pub fn get_grading(&self) -> Vec<U256> {
        self.grading.clone()
    }
}

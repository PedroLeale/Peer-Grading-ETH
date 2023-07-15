#[cfg(test)]
mod test{
    use ethereum_types::H32;
    use ethereum_types::U256;
    use peer_grading_eth_distribute_assignments::Contract;
    use peer_grading_eth_distribute_assignments::participant;

    #[test]
    fn test_distribution() {
        let global_seed = [0;32];
        let mut contract = Contract::new(global_seed);
        contract.add_assignments(vec![U256::from(0), U256::from(1), U256::from(2), U256::from(3), U256::from(4)]);

        for i in 0..5 {
            let commit = H32::zero();
            let penalty = U256::zero();
            let assignment_id = U256::from(i);
            let participant = participant::Participant::new(commit, penalty, assignment_id);
            contract.add_participant(participant);
        }

        contract.distribute_grading();

        let participants = contract.get_participants();
        for i in 0..participants.len() {
            let grade = participants[i].get_grading();
            for j in 0..grade.len() {
                assert!(grade[j] != participants[i].get_assignment_id());
            }
        }

    }
}
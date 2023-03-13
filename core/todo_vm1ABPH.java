import java.util.Scanner;
import java.util.ArrayList;

public class todo {
	public static void main(String args[]) {
		int choice = 0;
		ArrayList<String> tasks = new ArrayList<String>();
		Scanner sc = new Scanner(System.in);
		do {
			System.out.println("Select an option from the below menu:");
			System.out.println("Enter 1: To Add a task");
			System.out.println("Enter 2: To Update a task");
			System.out.println("Enter 3: To Delete a task");
			System.out.println("Enter 4: To Search a task");
			System.out.println("Enter 0: To Exit");
			System.out.print("Enter your choice: ");
			choice = sc.nextInt();
			if(choice == 1) {
				System.out.println("Enter the task to be Added");
				String task = sc.next();
				tasks.add(task);
			}
			else if(choice == 2) {
				System.out.println("Enter the task to be Updated");
				String task = sc.next();
				if(tasks.size() == 0) {
					System.out.println("No Tasks Present.");
					continue;
				}
				int index = tasks.indexOf(task);
				if (index == -1) {
		            System.out.println("Task not found!");
		        } else {
		        	System.out.println("Enter New task.");
					String newTask = sc.next();
					tasks.set(index, newTask);
					System.out.println("Task Updated Successfully.");
		        }
				
			}
			else if(choice == 3) {
				System.out.println("Enter the task to be Deleted");
				String task = sc.next();
			
				if(tasks.size() == 0) {
					System.out.println("No Tasks Present.");
					continue;
				}
				int index = tasks.indexOf(task);
				if (index == -1) {
		            System.out.println("Task not found!");
		        } else {
		        	tasks.set(index, null);
					System.out.println("Task Deleted Successfully.");
		        }

			}
			else if(choice == 4) {
				System.out.println("Enter the task to be Searched");
				String task = sc.next();
				if(tasks.size() == 0) {
					System.out.println("No Tasks Present.");
					continue;
				}

		        int index = tasks.indexOf(task);
		        if (index == -1) {
		            System.out.println("Task not found!");
		        } else {
		            System.out.println("Task found at Index " + index);
		        }
			}
			else {
				if(choice != 0) {
					System.out.println("Please Enter a valid choice.");
				}
				
			}
			
		}while(choice != 0);
		System.out.println("Thank You!");
	}
}


import sys

def compare(f1, f2):
    try:
        with open(f1, 'r') as file1, open(f2, 'r') as file2:
            l1 = file1.readlines()
            l2 = file2.readlines()
            
            max_lines = max(len(l1), len(l2))
            for i in range(max_lines):
                line1 = l1[i] if i < len(l1) else "<EOF>"
                line2 = l2[i] if i < len(l2) else "<EOF>"
                
                if line1 != line2:
                    print(f"Diff at line {i+1}:")
                    print(f"Legacy: {repr(line1)}")
                    print(f"Modern: {repr(line2)}")
                    return
            print("Files are identical!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compare_yaml.py <file1> <file2>")
    else:
        compare(sys.argv[1], sys.argv[2])

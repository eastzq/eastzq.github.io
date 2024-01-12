# 多文件编译
```makefile
CXX := g++
CXXFLAGS := -g -Wall -Wextra -std=c++11 -Iinclude
DIRECTORIES := src include bin
SOURCE_FILES := $(wildcard src/*.cpp)
EXECUTABLE := bin/main
all: create_dir compile run

create_dir: 
	@mkdir -p  $(DIRECTORIES)

compile: $(EXECUTABLE)

$(EXECUTABLE): $(SOURCE_FILES)
	$(CXX) $(CXXFLAGS) $^ -o $@

run:
	@echo "Program run result:\n $(shell bin/main)"
clean:
	@echo Cleaning...
	@rm -rf bin
.PHONY: clean all
```

---

```makefile
# $? 是一个特殊的自动化变量，表示目标文件所依赖的文件列表中，新于目标文件的所有文件的列表。
CXX := g++
CXXFLAGS := -g -Wall -Wextra -std=c++11
SOURCE_DIR := src
OBJECT_DIR := obj
ASSEMBLY_DIR := assem
folders := $(SOURCE_DIR) $(OBJECT_DIR) $(ASSEMBLY_DIR)

SOURCE_FILES := $(wildcard $(SOURCE_DIR)/*.cpp)
ASSEMBLY_FILES := $(patsubst $(SOURCE_DIR)/%.cpp,$(ASSEMBLY_DIR)/%.s,$(SOURCE_FILES))
OBJECT_FILES := $(patsubst $(SOURCE_DIR)/%.cpp,$(OBJECT_DIR)/%.o,$(SOURCE_FILES))
EXCUTE_FILES := $(patsubst $(SOURCE_DIR)/%.cpp,%,$(SOURCE_FILES))
all: create_dir compile getAssemblyFile

create_dir:
	@echo Create Directory $(folders)
	@mkdir -p $(folders)

print: $(OBJECT_FILES)
	@echo compiled files:  $?

compile: $(EXCUTE_FILES)

getAssemblyFile: $(ASSEMBLY_FILES)

$(EXCUTE_FILES): %: $(OBJECT_DIR)/%.o
	@echo Linking: $@
	@$(CXX) $(CXXFLAGS) $< -o $@

$(OBJECT_DIR)/%.o: $(SOURCE_DIR)/%.cpp
	@echo Compiling: $< to $@
	@g++ -c $< -o $@

$(ASSEMBLY_DIR)/%.s: $(SOURCE_DIR)/%.cpp
	@echo Compile to assem program: $@
	@g++ -S $< -o $@

clean:
	@echo Cleaning...
	@rm -rf $(OBJECT_DIR) $(ASSEMBLY_DIR) $(EXCUTE_FILES)

.PHONY: clean
```


# 单文件编译
```makefile
# Compiler
CC := g++
# Compiler flags
CFLAGS := -Wall -Wextra -std=c++20

# Directories
SRC_DIR := src
OBJ_DIR := object

# Souce files
SOURCES := $(wildcard $(SRC_DIR)/*.cpp)

# Object files
OBJECTS := $(patsubst $(SRC_DIR)/%.cpp,$(OBJ_DIR)/%.o,$(SOURCES))

# Generate executable names based on the source file names
EXCUTES := $(patsubst $(SRC_DIR)/%.cpp,%,$(SOURCES))

# Targets
all: $(EXCUTES)

$(EXCUTES): %: $(OBJ_DIR)/%.o
	$(CC) $(CFLAGS) $< -o $@

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p $(OBJ_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -rf $(OBJ_DIR) $(EXCUTES)

.PHONY: all clean

```

